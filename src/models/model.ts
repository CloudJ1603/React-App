import React, {useReducer} from 'react'


export interface Todo{
    id: number;
    todo: string;
    isDone: boolean;
}


// type Actions = {
//     | {type:'add', payload:string}
//     | 
// }


// const TodoReducer = (state:Todo[], action) => {

// }

// export const model = () => {
//     const [state, dispatch] = useReducer(TodoReducer, [])
//   return (
//     <div>model</div>
//   )
// }
