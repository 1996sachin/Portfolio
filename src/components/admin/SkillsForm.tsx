import type { SkillCategory } from '../../data/content'

type SkillsFormProps = {
  data: SkillCategory[]
  onChange: (data: SkillCategory[]) => void
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const handleCategoryChange = (index: number, title: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], title }
    onChange(newData)
  }

  const addCategory = () => {
    onChange([...data, { title: '', skills: [] }])
  }

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleSkillChange = (catIndex: number, skillIndex: number, value: string) => {
    const newData = [...data]
    const newSkills = [...newData[catIndex].skills]
    newSkills[skillIndex] = value
    newData[catIndex] = { ...newData[catIndex], skills: newSkills }
    onChange(newData)
  }

  const addSkill = (catIndex: number) => {
    const newData = [...data]
    newData[catIndex] = {
      ...newData[catIndex],
      skills: [...newData[catIndex].skills, ''],
    }
    onChange(newData)
  }

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...data]
    newData[catIndex] = {
      ...newData[catIndex],
      skills: newData[catIndex].skills.filter((_, i) => i !== skillIndex),
    }
    onChange(newData)
  }

  return (
    <div className="admin-form">
      <div className="admin-form-header">
        <h3>Skill Matrix</h3>
        <button className="btn ghost sm" onClick={addCategory}>Add Category</button>
      </div>
      {data.map((category, index) => (
        <div key={index} className="admin-form-item">
          <div className="admin-form-item-header">
            <h4>{category.title || `Category #${index + 1}`}</h4>
            <button className="btn ghost sm danger" onClick={() => removeCategory(index)}>Remove</button>
          </div>
          <label>
            Category Title
            <input
              type="text"
              value={category.title}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
            />
          </label>
          <div className="admin-form-group">
            <h5>Skills</h5>
            {category.skills.map((skill, sIndex) => (
              <div key={sIndex} className="admin-input-group">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, sIndex, e.target.value)}
                />
                <button className="btn ghost sm" onClick={() => removeSkill(index, sIndex)}>×</button>
              </div>
            ))}
            <button className="btn ghost sm" onClick={() => addSkill(index)}>Add Skill</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsForm
