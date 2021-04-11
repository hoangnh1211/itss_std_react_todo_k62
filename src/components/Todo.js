import React, { useState, useEffect } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, putItems] = React.useState([
      /* テストコード 開始 *  /* テストコード 終了 */
  ]);
  useEffect(()=>{
    let follow = JSON.parse(localStorage.getItem("follow")) || [];
    putItems(follow)
  },[])

  const [tab,setTab]=useState("all")
  const colorgrey={
    color:"gray"
  }
  const colorblack={
    color:"black"
  }
  const add=(e)=>{
    if(e.key === "Enter"){
      putItems([...items,{
        key:getKey(),
        text: e.target.value,
        done:false
      }])
      console.log([...items,{
        key:getKey(),
        text: e.target.value,
       }])
       localStorage.setItem("follow", JSON.stringify([...items,{
        key:getKey(),
        text: e.target.value,
        done:false
       }]));
    } 
  }
  const changecolor=(key)=>{
    const index = items.findIndex(value=>value.key===key)
    if (index !== -1){
      if (items[index].done===false){
        items[index].done=true
      } else {
        items[index].done=false
      }
      console.log(items)
      putItems([...items])    
    }
  }
  const changtab=(value)=>{
    setTab(value)
  }
  const deleteTodo = ()=>{
    putItems([])
    localStorage.removeItem("follow")
  }
  let listItems=null
  if (tab==="all"){
    listItems=items
  } else if (tab==="notht"){
    listItems= items.filter(value=>value.done ===false)
  } else {
    listItems= items.filter(value=>value.done ===true)
  }
  let checked
  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input class="input" type="text" onKeyDown={add}  />
      <p onClick={()=>{changtab("all")}} >全て</p>
      <p onClick={()=>{changtab("notht")}}>未完了</p>
      <p onClick={()=>{changtab("ht")}}>完了済み</p>
      {listItems.map(item => (
        <label className="panel-block"style= { item.done===false ? colorblack: colorgrey}>
            <input type="checkbox" onClick={()=>{changecolor(item.key)}} checked= {item.done===false ? null: "checked"} />
            {item.text}
        </label>
      ))}
      <div className="panel-block">
        {items.length} items
      </div>
      <button onClick={deleteTodo}>全てのTODOを削除</button>
    </div>
  );
}

export default Todo;