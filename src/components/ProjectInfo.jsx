import { useState } from "react";
import Button from "./commonComponents/Button";

export default function ProjectInfo({
  project,
  projectIndex,
  onAddTask,
  onClearTask,
  onDeleteProject,
}) {
  const [taskName, setTaskName] = useState("");

  const dateInfo = new Date(project.dueDate);

  return (
    <section className="w-[35rem] mt-16">
      <div className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <Button
            title="Delete"
            onClick={() => onDeleteProject(projectIndex)}
            className="text-stone-700 hover:text-red-500"
          >
            Delete
          </Button>
        </div>
        <p className="mb-4 text-stone-400">
          {dateInfo.toLocaleString("default", { month: "long" })}{" "}
          {dateInfo.getDate()}, {dateInfo.getFullYear()}
        </p>
        <p className="text-stone-600 mb-4">{project.description}</p>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-stone-600 mb-2">Tasks</h1>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <Button
          title="Add Task"
          onClick={() => onAddTask(projectIndex, taskName, setTaskName)}
          className="text-stone-700 hover:text-stone-950 ml-5"
        >
          Add Task
        </Button>
        {project.tasks?.length ? (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {project.tasks.map((task, index) => (
              <li
                key={`${task}-${index}`}
                className="flex justify-between my-4"
              >
                <p className="text-stone-800 my-4">{task}</p>
                <Button
                  title="Clear"
                  onClick={() => onClearTask(projectIndex, index)}
                  className="text-stone-700 hover:text-red-500"
                >
                  Clear
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
      </div>
    </section>
  );
}
