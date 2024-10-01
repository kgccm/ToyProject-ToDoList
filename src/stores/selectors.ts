// src/stores/selectors.ts
import { createSelector } from 'reselect';
import { RootState } from './index';

// 선택된 날짜 선택자
export const selectSelectedDate = (state: RootState) => state.date.selectedDate;

// 날짜별 Todo 목록 선택자
export const selectTodosByDate = createSelector(
  [(state: RootState, selectedDate: Date) => selectedDate, (state: RootState) => state.todos],
  (selectedDate, todos) => todos[selectedDate.toISOString().split('T')[0]] || []
);
