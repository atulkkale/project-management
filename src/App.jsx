import { useState } from "react";
import AddProjectForm from "./components/AddProjectForm";
import Aside from "./components/Aside";
import NoProject from "./components/NoProject";
import ProjectInfo from "./components/ProjectInfo";

function App() {
  const [projects, setProjects] = useState([]);
  const [layoutInfo, setLayoutInfo] = useState({
    isAddProject: false,
    openProject: -1,
  });

  function handleAddProjectClick(e) {
    e.preventDefault();
    setLayoutInfo((prevLayout) => ({
      ...prevLayout,
      isAddProject: true,
      openProject: -1,
    }));
  }

  function handleCancelProject() {
    setLayoutInfo((prevLayout) => ({ ...prevLayout, isAddProject: false }));
  }

  function handleAddProject(project) {
    setProjects((prevProject) => [...prevProject, project]);
    setLayoutInfo((prevLayout) => ({
      ...prevLayout,
      isAddProject: false,
      openProject: -1,
    }));
  }

  function handleProjectSelect(projectIndex) {
    setLayoutInfo((prevLayout) => ({
      ...prevLayout,
      isAddProject: false,
      openProject: projectIndex,
    }));
  }

  function handleAddTask(projectIndex, taskName, onSetTaskName) {
    onSetTaskName("");
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];

      if (!newProjects[projectIndex].tasks) {
        newProjects[projectIndex].tasks = [];
        newProjects[projectIndex].tasks.push(taskName);
        return newProjects;
      } else {
        newProjects[projectIndex].tasks.push(taskName);
      }

      return newProjects;
    });
  }

  function handleClearTask(projectIndex, taskIndex) {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];

      newProjects[projectIndex].tasks.splice(taskIndex, 1);

      return newProjects;
    });
  }

  function handleOnDeleteProject(projectIndex) {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      newProjects.splice(projectIndex, 1);
      return newProjects;
    });
    setLayoutInfo((prevLayout) => ({
      ...prevLayout,
      openProject: -1,
    }));
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Aside
        projects={projects}
        onProjectSelect={handleProjectSelect}
        onClickAddProject={handleAddProjectClick}
      />
      {layoutInfo.openProject >= 0 ? (
        <ProjectInfo
          project={projects[layoutInfo.openProject]}
          projectIndex={layoutInfo.openProject}
          onAddTask={handleAddTask}
          onClearTask={handleClearTask}
          onDeleteProject={handleOnDeleteProject}
        />
      ) : null}
      {!layoutInfo.isAddProject && layoutInfo.openProject < 0 ? (
        <NoProject onClickAddProject={handleAddProjectClick} />
      ) : null}
      {layoutInfo.isAddProject && (
        <AddProjectForm
          projects={projects}
          onAddProject={handleAddProject}
          onCancelProject={handleCancelProject}
        />
      )}
    </main>
  );
}

export default App;
