// React から useState フックをインポート
import { useState } from 'react';

type Todo = {
  value: string;
  readonly id : number;
  checked: boolean;
  removed: boolean;
};

export const App = () => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   * useState の引数 = ステートの初期値 (=空の文字列)
   */
  const [text, setText] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    /**
     * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
     * 以下と同義
     *
     * const copyTodos = todos.slice();
     * copyTodos.unshift(newTodo);
     * setTodos(copyTodos);
     *
     **/
    setTodos([newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    /**
     * 引数として渡された todo の id が一致する
     * todos ステート（のコピー）内の todo の
     * value プロパティを引数 value (= e.target.value) に書き換える
     */

    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));
    // todos ステートを更新
    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
     {/* コールバックとして () => handleOnSubmit() を渡す */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        {/* 上に同じ */}
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
     </form>
     <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>
                    <input
                      type="checkbox"
                      disabled={todo.removed}
                      checked={todo.checked}
                      onChange={() => handleOnCheck(todo.id, todo.checked)}
                    />
                    <input
                      type="text"
                      disabled={todo.checked || todo.removed}
                      value={todo.value}
                      onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                    />
                    <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                      {todo.removed ? '復元' : '削除'}
                    </button>
                </li>
        })}
      </ul>
   </div>
  );
};