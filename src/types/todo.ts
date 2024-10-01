// src/types/todo.ts
export interface TodoItem {
    id: number; // 각 할 일의 고유 ID
    text: string; // 할 일 내용
    isCompleted: boolean; // 할 일 완료 상태
}

export interface TodoList {
    [date: string]: TodoItem[]; // 날짜별 할 일 리스트
}
