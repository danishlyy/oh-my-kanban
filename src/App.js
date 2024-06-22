/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { css } from '@emotion/react';



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
    <li css={kanbanCardStyles}>
      <div css={kanbanCardTitleStyles}>{title}</div>
      <div css={css`
        text-align: right;
        font-size: 0.8rem;
        color: #333;
      `}>{status}</div>
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
    <li css={kanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div css={css`
        ${kanbanCardTitleStyles}

        & > input[type=“text”] {
          width:80%
        }
        `}>
        <input type='text' value={title} onChange={handleChange} onKeyDown={handleKeyDown}></input>
      </div>
    </li>
  )
}

const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover {
    box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,0.2), inset 0 1px #fff;
  }
`;

const kanbanCardTitleStyles = css`
  min-height: 3rem;
`;


//  <main> 改写成 React 组件
const KanbanBoard = ({ children }) => (
  <main css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `}>{children}</main>
);

const KanbanColumn = ({ children, className, title }) => {
  return (
    <section className={className} css={css`
      flex: 1 1;
      display: flex;
      flex-direction: column;
      border: 1px solid gray;
      border-radius: 1rem;

      & > h2 {
        margin: 0.6rem 1rem;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid gray;

        & > button {
          float: right;
          margin-top: 0.2rem;
          padding: 0.2rem 0.5rem;
          border: 0;
          border-radius: 1rem;
          height: 1.8rem;
          line-height: 1rem;
          font-size: 1rem;
        }
      }

      & > ul {
        flex: 1;
        flex-basis: 0;
        margin: 1rem;
        padding: 0;
        overflow: auto;
      }
    `}>
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
