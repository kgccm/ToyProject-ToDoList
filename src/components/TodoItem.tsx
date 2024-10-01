"use client";
import React, { useState } from "react";
import styles from "./../styles/TodoItem.module.css";

interface TodoItemProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  id,
  text,
  isCompleted,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(id, inputValue);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className={styles.todoItem}>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.todoInput}
        />
      ) : (
        <span className={styles.todoText}>{text}</span>
      )}
      {isEditing ? (
        <button onClick={handleSave} className={styles.saveButton}>
          ✅
        </button>
      ) : (
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️
        </button>
      )}
      <button onClick={handleDelete} className={styles.deleteButton}>
        ❌
      </button>
    </div>
  );
}
