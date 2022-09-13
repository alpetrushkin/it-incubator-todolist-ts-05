import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
   id: string,
   title: string,
   filter: FilterValuesType

}

function App() {

   let todolistID1 = v1();
   let todolistID2 = v1();
   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'},
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]:
         [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}, {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
         ],
      [todolistID2]:
         [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
         ]
   });

   //
   // let [todolists, setTodolists] = useState<Array<TodolistsType>>([{
   //    id: v1(),
   //    title: 'What to learn',
   //    filter: 'all'
   // },
   //    {id: v1(), title: 'What to buy', filter: 'all'},
   // ])

   // let [tasks, setTasks] = useState([
   //    {id: v1(), title: "HTML&CSS", isDone: true},
   //    {id: v1(), title: "JS", isDone: true},
   //    {id: v1(), title: "ReactJS", isDone: false},
   //    {id: v1(), title: "Rest API", isDone: false},
   //    {id: v1(), title: "GraphQL", isDone: false},
   // ]);

   // let [filter, setFilter] = useState<FilterValuesType>("all");

   const removeTodoList = (todoListId: string) => {
      setTodolists(todolists.filter(el => el.id !== todoListId))
      delete tasks[todoListId]


   }

   function removeTask(todolistId: string, taskId: string) {
      // let filteredTasks = tasks.filter(t => t.id != id);
      // setTasks(filteredTasks);
      setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=> t.id !== taskId) })

   }

   function addTask(todolistId: string, title: string) {
      let newTask = {id: v1(), title: title, isDone: false};
      // let newTasks = [task, ...tasks];
      // setTasks(newTasks);
      setTasks({...tasks,[todolistId]: [...tasks[todolistId], newTask]})
   }

   function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
      // let task = tasks.find(t => t.id === taskId);
      // if (task) {
      //    task.isDone = isDone;
      // }
      //
      // setTasks([...tasks]);
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> el.id === taskId ? {...el, isDone: isDone } : el)})
   }


   function changeFilter(todolistId: string, filterValue: FilterValuesType) {
      // setFilter(value);
      setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filterValue} : el))
   }


   return (
      <div className="App">
         {
            todolists.map(el => {
               let tasksForTodolist = tasks[el.id];

               if (el.filter === "active") {
                  tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
               }
               if (el.filter === "completed") {
                  tasksForTodolist = tasks[el.id].filter(t => t.isDone);
               }

               return (
                  <Todolist
                     title={el.title}
                     key={el.id}
                     todolistId={el.id}
                     tasks={tasksForTodolist}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeTaskStatus={changeStatus}
                     filter={el.filter}
                     removeTodoList={removeTodoList}
                  />
               )
            })}
      </div>
   );
}

export default App;
