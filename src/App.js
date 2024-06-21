/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



const ongoingList = [
  { title: '开发任务-4', status: '22-05-22 18:15' },
  { title: '开发任务-6', status: '22-05-22 18:15' },
  { title: '开发任务-2', status: '22-05-22 18:15' }
]

const doneList = [
  { title: '开发任务-2', status: '22-05-22 18:15' },
  { title: '开发任务-1', status: '22-05-22 18:15' }
]
// 组件
const KanbanCard = ({ title, status }) => {
  return (
    <li className='kanban-card'>
      <div className='card-title'>{title}</div>
      <div className='card-status'>{status}</div>
    </li>
  )
}


// 添加卡片组件
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  };
  return (
    <li className='kanban-card'>
      <h3>添加新卡片</h3>
      <div className='card-title'>
        <input type='text' value={title} onChange={handleChange} onKeyDown={handleKeyDown}></input>
      </div>
    </li>
  )
}

//  <main> 改写成 React 组件
const KanbanBoard = ({ children }) => (
  <main className='kanban-board'>{children}</main>
);

const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};


function App() {
  const [showAdd, setShowAdd] = useState(false)
  const [todoList, setToDoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '开发任务-7', status: '22-05-22 18:15' }
  ]
  );

  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  // 在组件内部改变state会让组件重新渲染
  const handleSubmit = (title) => {
    setToDoList(currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ])
    // setShowAdd(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <KanbanBoard>
        <KanbanColumn className='column-todo' title={<>待处理 <button onClick={handleAdd} disabled={showAdd}>&#8853;添加新卡片</button></>}>

          {showAdd && <KanbanNewCard onSubmit={handleSubmit}></KanbanNewCard>}
          {todoList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
        <KanbanColumn className='column-ongoing' title='进行中'>
          {ongoingList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
        <KanbanColumn className='column-done' title='已完成'>
          {doneList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
      </KanbanBoard>
    </div >
  );
}

export default App;
