'use client';

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react';
import { AdminGuard } from './admin-guard';
import { authFetch } from '@/lib/api';

type ContentItem = {
  id: number;
};

type SelectOption = {
  label: string;
  value: string | number;
};

export type ContentField<T extends ContentItem> = {
  name: Extract<keyof T, string>;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'array' | 'checkbox' | 'datetime' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string | number | boolean;
};

export type ContentColumn<T extends ContentItem> = {
  header: string;
  render: (item: T) => ReactNode;
};

type ContentManagerProps<T extends ContentItem> = {
  title: string;
  description: string;
  endpoint: string;
  createLabel: string;
  emptyText: string;
  fields: ContentField<T>[];
  columns: ContentColumn<T>[];
};

function toDateTimeLocal(value: unknown) {
  if (!value) {
    return '';
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().slice(0, 16);
}

function getFieldDefault<T extends ContentItem>(field: ContentField<T>, item: T | null) {
  const value = item?.[field.name] ?? field.defaultValue ?? '';

  if (field.type === 'array') {
    return Array.isArray(value) ? value.join('\n') : String(value || '');
  }

  if (field.type === 'datetime') {
    return toDateTimeLocal(value);
  }

  return String(value ?? '');
}

function parsePayload<T extends ContentItem>(fields: ContentField<T>[], form: FormData) {
  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    if (field.type === 'checkbox') {
      payload[field.name] = form.get(field.name) === 'on';
      continue;
    }

    const raw = String(form.get(field.name) ?? '').trim();

    if (!raw && !field.required) {
      continue;
    }

    if (field.type === 'number' || field.type === 'select') {
      payload[field.name] = Number(raw);
      continue;
    }

    if (field.type === 'array') {
      payload[field.name] = raw
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    if (field.type === 'datetime') {
      payload[field.name] = new Date(raw).toISOString();
      continue;
    }

    payload[field.name] = raw;
  }

  return payload;
}

function AdminContentManagerInner<T extends ContentItem>({
  title,
  description,
  endpoint,
  createLabel,
  emptyText,
  fields,
  columns
}: ContentManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const formTitle = useMemo(() => (editingItem ? 'Редактировать' : createLabel), [createLabel, editingItem]);

  async function loadItems() {
    const token = localStorage.getItem('bs-arena-token');

    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await authFetch<T[]>(endpoint, token);
      setItems(data);
    } catch {
      setError('Не удалось загрузить данные.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, [endpoint]);

  function startCreate() {
    setEditingItem(null);
    setFormOpen(true);
    setError(null);
  }

  function startEdit(item: T) {
    setEditingItem(item);
    setFormOpen(true);
    setError(null);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem('bs-arena-token');

    if (!token) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = parsePayload(fields, new FormData(event.currentTarget));
      const path = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;
      const method = editingItem ? 'PATCH' : 'POST';
      await authFetch<T>(path, token, {
        method,
        body: JSON.stringify(payload)
      });
      setFormOpen(false);
      setEditingItem(null);
      await loadItems();
    } catch {
      setError('Не удалось сохранить данные. Проверьте поля и попробуйте еще раз.');
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item: T) {
    const token = localStorage.getItem('bs-arena-token');

    if (!token || !window.confirm('Удалить запись?')) {
      return;
    }

    setError(null);

    try {
      await authFetch<T>(`${endpoint}/${item.id}`, token, {
        method: 'DELETE'
      });
      await loadItems();
    } catch {
      setError('Не удалось удалить запись. Проверьте права доступа.');
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-arena-clay">Контент</p>
          <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadItems}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            <RefreshCw size={16} aria-hidden />
            Обновить
          </button>
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-md bg-arena-ink px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            <Plus size={16} aria-hidden />
            {createLabel}
          </button>
        </div>
      </div>

      {error ? <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div> : null}

      {formOpen ? (
        <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">{formTitle}</h2>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setEditingItem(null);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
            >
              <X size={16} aria-hidden />
              Отмена
            </button>
          </div>
          <form onSubmit={submitForm} className="mt-5 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={`grid gap-2 text-sm font-medium ${field.type === 'textarea' || field.type === 'array' ? 'md:col-span-2' : ''}`}>
                {field.label}
                {field.type === 'textarea' || field.type === 'array' ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={field.type === 'array' ? 4 : 5}
                    defaultValue={getFieldDefault(field, editingItem)}
                    placeholder={field.placeholder}
                    className="resize-none rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-arena-teal"
                  />
                ) : field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    defaultChecked={Boolean(editingItem?.[field.name] ?? field.defaultValue ?? true)}
                    className="h-5 w-5 rounded border-neutral-300"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    required={field.required}
                    defaultValue={getFieldDefault(field, editingItem)}
                    className="rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-teal"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'datetime' ? 'datetime-local' : field.type}
                    name={field.name}
                    required={field.required}
                    defaultValue={getFieldDefault(field, editingItem)}
                    placeholder={field.placeholder}
                    className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-arena-teal"
                  />
                )}
              </label>
            ))}
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-md bg-arena-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
              >
                <Save size={16} aria-hidden />
                {saving ? 'Сохраняем' : 'Сохранить'}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                {columns.map((column) => (
                  <th key={column.header} className="px-4 py-3 font-semibold">
                    {column.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td className="px-4 py-5 text-neutral-500" colSpan={columns.length + 1}>
                    Загружаем данные...
                  </td>
                </tr>
              ) : null}
              {!loading && items.length === 0 ? (
                <tr>
                  <td className="px-4 py-5 text-neutral-500" colSpan={columns.length + 1}>
                    {emptyText}
                  </td>
                </tr>
              ) : null}
              {items.map((item) => (
                <tr key={item.id} className="align-top">
                  {columns.map((column) => (
                    <td key={column.header} className="px-4 py-4">
                      {column.render(item)}
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 text-xs font-semibold hover:bg-neutral-50"
                      >
                        <Pencil size={14} aria-hidden />
                        Изменить
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} aria-hidden />
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function AdminContentManager<T extends ContentItem>(props: ContentManagerProps<T>) {
  return (
    <AdminGuard>
      <AdminContentManagerInner {...props} />
    </AdminGuard>
  );
}
