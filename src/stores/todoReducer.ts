// src/stores/todoReducer.ts
import { TodoItem, TodoList } from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState: TodoList = {};

// createSlice로 리듀서 및 액션 생성
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ date: string; todo: TodoItem }>) => {
            const { date, todo } = action.payload;
            state[date] = [...(state[date] || []), todo];
        },
        deleteTodo: (state, action: PayloadAction<{ date: string; id: number }>) => {
            const { date, id } = action.payload;
            state[date] = state[date].filter((todo) => todo.id !== id);
        },
        editTodo: (state, action: PayloadAction<{ date: string; id: number; newText: string }>) => {
            const { date, id, newText } = action.payload;
            const todoList = state[date];
            if (todoList) {
                const todo = todoList.find((todo) => todo.id === id);
                if (todo) {
                    todo.text = newText;
                }
            }
        },
    },
});

// 액션 생성자 및 리듀서 내보내기
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
