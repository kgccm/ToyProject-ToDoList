"use client";
import React, { useState } from "react";
import styles from "./../styles/TodoSection.module.css";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { addTodo, deleteTodo, editTodo } from "@/stores/todoReducer";
import { selectSelectedDate, selectTodosByDate } from "@/stores/selectors";

export default function TodoSection() {
  const dispatch = useDispatch();

  // Redux store에서 selectedDate 가져오기
  const selectedDate = useSelector(selectSelectedDate);

  // Redux store에서 해당 날짜의 todo 목록 가져오기
  const todos = useSelector((state: RootState) =>
    selectTodosByDate(state, selectedDate)
  );

  const [newTodo, setNewTodo] = useState("");

  // 새로운 할 일 추가
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
    };
    dispatch(
      addTodo({
        date: selectedDate.toISOString().split("T")[0],
        todo: newTodoItem,
      })
    );
    setNewTodo("");
  };

  // 엔터키를 눌렀을 때 할 일 추가
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // 할 일 수정
  const handleUpdateTodo = (id: number, newText: string) => {
    dispatch(
      editTodo({
        date: selectedDate.toISOString().split("T")[0],
        id,
        newText,
      })
    );
  };

  // 할 일 삭제
  const handleDeleteTodo = (id: number) => {
    dispatch(
      deleteTodo({ date: selectedDate.toISOString().split("T")[0], id })
    );
  };

  return (
    <div className={styles.TodoSectionContainer}>
      <div className={styles.TodoSectionTopBox}>
        <div className={styles.TodoSectionTopTitle}>
          {selectedDate.toISOString().split("T")[0]} 일정
        </div>
      </div>
      <div className={styles.TodoSectionMiddleBox}>
        <div className={styles.TodoSectionMiddleText}>
          {"📜Write a ToDo List😊"}
        </div>
      </div>

      <div className={styles.TodoSectionInputBox}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a new todo"
          className={styles.TodoSectionInput}
        />
        <button onClick={handleAddTodo} className={styles.TodoAddButton}>추가</button>
      </div>
      <div className={styles.TodoSectionItemListBox}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
