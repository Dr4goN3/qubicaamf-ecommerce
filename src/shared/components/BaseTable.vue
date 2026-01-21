<template>
  <div class="base-table">
    <table class="base-table__table">
      <thead class="base-table__header">
        <tr>
          <th v-for="column in columns" :key="column.key" class="base-table__th">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="base-table__body">
        <tr
          v-for="(row, index) in data"
          :key="getRowKey(row, index)"
          :class="['base-table__row', { 'is-clickable': clickable }]"
          :role="clickable ? 'button' : undefined"
          :tabindex="clickable ? 0 : undefined"
          :aria-label="clickable ? t('table.selectedRow') : undefined"
          @click="clickable ? handleRowClick(row, index) : undefined"
          @keydown.enter="clickable ? handleRowClick(row, index) : undefined"
          @keydown.space.prevent="clickable ? handleRowClick(row, index) : undefined"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :data-label="column.label"
            class="base-table__td"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="getCellValue(row, column)"
            >
              {{ getCellValue(row, column) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumn, TableProps, TableRow } from '@/shared/types/ui-kit/table'

const { t } = useI18n()

const props = withDefaults(defineProps<TableProps>(), {
  clickable: false,
})

const emit = defineEmits<{
  (e: 'rowClick', row: TableRow, index: number): void
}>()

function getRowKey(row: TableRow, index: number): string | number {
  if (typeof props.rowKey === 'function') {
    const key = props.rowKey(row, index)
    return typeof key === 'string' || typeof key === 'number' ? key : index
  }

  if (typeof props.rowKey === 'string') {
    const key = row[props.rowKey]
    return typeof key === 'string' || typeof key === 'number' ? key : index
  }

  return index
}

function getCellValue(row: TableRow, column: TableColumn): string | number {
  if (column.formatter) {
    return column.formatter(row)
  }

  return row[column.key] as string | number
}

function handleRowClick(row: TableRow, index: number) {
  emit('rowClick', row, index)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/breakpoints' as *;

.base-table {
  width: 100%;
  overflow-x: auto;

  &__table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  &__header {
    background: var(--surface-2);
  }

  &__th {
    padding: var(--space-3) var(--space-4);
    text-align: left;
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    color: var(--text);
    border-bottom: 1px solid var(--border);
  }

  &__row {
    transition: background var(--transition-fast), box-shadow var(--transition-fast),
      transform var(--transition-fast);

    &:hover {
      background: var(--surface-2);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--border);
    }

    &.is-clickable {
      cursor: pointer;

      &:hover {
        position: relative;
        z-index: 1;
        box-shadow: var(--shadow-sm);
      }

      &:focus-visible {
        @include focus-ring;
        outline-offset: -2px;
      }

      &:active {
        transform: scale(0.99);
      }
    }
  }

  &__td {
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-base);
    color: var(--text);
  }
}

@media (max-width: $breakpoint-tablet) {
  .base-table {
    &__table {
      border: 0;
    }

    &__header {
      display: none;
    }

    &__row {
      display: block;
      margin-bottom: var(--space-5);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: var(--space-4);
      background: var(--surface);
      box-shadow: var(--shadow-sm);

      &:hover {
        background: var(--surface-2);
      }

      &.is-clickable:hover {
        box-shadow: var(--shadow-md);
      }
    }

    &__td {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--border);

      &:last-child {
        border-bottom: 0;
      }

      &::before {
        content: attr(data-label);
        font-weight: var(--font-semibold);
        color: var(--text-muted);
        margin-right: var(--space-3);
      }
    }
  }
}
</style>
