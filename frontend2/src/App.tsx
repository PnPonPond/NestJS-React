import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

// type AppState = {
//   message: string;
// };
// class App extends React.Component<{}, AppState> {
//   state: AppState = {
//     message: "Default message",
//   };

//   componentDidMount(){
//   fetch('http://localhost:3000/courses/')
//     .then(res=>res.json())
//     .then(obj=>{
//       this.setState({message:obj.message});
//     });
// }
//   render() {
//     return (
// <div>
//   {this.state.message}
// </div>
//     );
//   }

// }

const App = () => {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/courses/")
      .then((res) => res.json())
      .then((courses) => {
        setCourses(courses);
      });
  }, []);
  return (
    <div className="App">
      <ul>
      {courses.map((item) => (
        <li key={item.id}>{item.number} - {item.title}</li>
      ))}
      </ul>
    </div>
  );
};

export default App;
