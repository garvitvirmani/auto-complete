// App.js
import React from 'react';
import Autocomplete from './AutoComplete';
import { useState } from 'react';


const App = () => {

  const [data,setData] = useState(['Apple', 'Banana', 'Orange', 'Grapes', 'Mango','Guava','Lichi']);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Autocomplete - type fruit names eg-> Apple , Mango , Orange</h1>
      <h3 className="text-xl font-bold mb-4"> add item | use backspace to delete | use up-down keyboard arrow to navigate list | enter to select </h3>
      <Autocomplete data={data} setData={setData} />
    </div>
  );
};

export default App;
