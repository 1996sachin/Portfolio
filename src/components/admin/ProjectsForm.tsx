import type { Project } from '../../data/content'

type ProjectsFormProps = {
  data: Project[]
  onChange: (data: Project[]) => void
}

const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addProject = () => {
    onChange([
      {
        title: '',
        description: '',
        stack: [],
        highlight: '',
      },
      ...data,
    ])
  }

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleStackChange = (projIndex: number, stackIndex: number, value: string) => {
    const newData = [...data]
    const newStack = [...newData[projIndex].stack]
    newStack[stackIndex] = value
    newData[projIndex] = { ...newData[projIndex], stack: newStack }
    onChange(newData)
  }

  const addStackItem = (projIndex: number) => {
    const newData = [...data]
    newData[projIndex] = {
      ...newData[projIndex],
      stack: [...newData[projIndex].stack, ''],
    }
    onChange(newData)
  }

  const removeStackItem = (projIndex: number, stackIndex: number) => {
    const newData = [...data]
    newData[projIndex] = {
      ...newData[projIndex],
      stack: newData[projIndex].stack.filter((_, i) => i !== stackIndex),
    }
    onChange(newData)
  }

  return (
    <div className="admin-form">
      <div className="admin-form-header">
        <h3>Projects</h3>
        <button className="btn ghost sm" onClick={addProject}>Add Project</button>
      </div>
      {data.map((project, index) => (
        <div key={index} className="admin-form-item">
          <div className="admin-form-item-header">
            <h4>{project.title || `Project #${index + 1}`}</h4>
            <button className="btn ghost sm danger" onClick={() => removeProject(index)}>Remove</button>
          </div>
          <label>
            Title
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            />
          </label>
          <label>
            Main Highlight
            <input
              type="text"
              value={project.highlight}
              onChange={(e) => handleProjectChange(index, 'highlight', e.target.value)}
            />
          </label>
          <label>
            Link (Optional)
            <input
              type="text"
              value={project.link || ''}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
            />
          </label>
          <div className="admin-form-group">
            <h5>Tech Stack</h5>
            <div className="admin-tags-editor">
              {project.stack.map((tech, sIndex) => (
                <div key={sIndex} className="admin-input-group">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleStackChange(index, sIndex, e.target.value)}
                  />
                  <button className="btn ghost sm" onClick={() => removeStackItem(index, sIndex)}>×</button>
                </div>
              ))}
              <button className="btn ghost sm" onClick={() => addStackItem(index)}>Add Tech</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsForm
