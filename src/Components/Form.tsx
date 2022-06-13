import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const onAdd = async () => {
    await fetch("http://localhost:8000/users/", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res2) => {
        if (res2.status !== 201) {
          return;
        } else {
          return res2.json();
        }
      })
      .then((res2) => {
        console.log(res2);
      });
  };
  const handleOnChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const toast = useToast();

  const handleAddUser = () => {
    onAdd();
    toast({
      title: "User created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <input id="name" placeholder="name" onChange={handleOnChange} />
      <input id="email" placeholder="email" onChange={handleOnChange} />
      <button onClick={handleAddUser}>Add</button>
    </div>
  );
};

export default Form;
