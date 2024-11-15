import { useRef, useState } from "react";
import Input from "./commonComponents/Input";
import Button from "./commonComponents/Button";
import Modal from "./commonComponents/Modal";

export default function AddProjectForm({ onCancelProject, onAddProject }) {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const model = useRef();

  function handleProjectInputChange(id, enteredValue) {
    setInputData((prevInputData) => {
      return { ...prevInputData, [id]: enteredValue };
    });
  }

  function handleAddProject() {
    const enteredTitle = inputData.title;
    const enteredDescription = inputData.description;
    const enteredDueDate = inputData.dueDate;

    if (!enteredTitle || !enteredDescription || !enteredDueDate) {
      model.current.open();
      return;
    }

    onAddProject(inputData);
  }

  const labelClasses = "text-sm font-bold uppercase text-stone-500";
  const inputClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <>
      <Modal ref={model} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>{" "}
      <div className="w-[35rem] mt-16">
        <ul className="flex items-center justify-end gap-4 my-4">
          <li>
            <Button
              onClick={onCancelProject}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              onClick={handleAddProject}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </Button>
          </li>
        </ul>
        <form>
          <Input
            type="text"
            label="Title"
            id="title"
            value={inputData.title}
            onChange={handleProjectInputChange}
            labelClasses={labelClasses}
            inputClasses={inputClasses}
          />
          <Input
            type="textarea"
            label="Description"
            id="description"
            value={inputData.description}
            onChange={handleProjectInputChange}
            labelClasses={labelClasses}
            inputClasses={inputClasses}
          />
          <Input
            type="date"
            label="Due Date"
            id="dueDate"
            value={inputData.dueDate}
            onChange={handleProjectInputChange}
            labelClasses={labelClasses}
            inputClasses={inputClasses}
          />
        </form>
      </div>
    </>
  );
}
