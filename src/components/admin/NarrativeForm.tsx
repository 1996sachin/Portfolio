import type { Narrative } from '../../data/content'

type NarrativeFormProps = {
  data: Narrative
  onChange: (data: Narrative) => void
}

const NarrativeForm = ({ data, onChange }: NarrativeFormProps) => {
  const handleIntroChange = (value: string) => {
    onChange({ ...data, intro: value })
  }

  const handlePillarChange = (index: number, field: 'title' | 'detail', value: string) => {
    const newPillars = [...data.pillars]
    newPillars[index] = { ...newPillars[index], [field]: value }
    onChange({ ...data, pillars: newPillars })
  }

  const addPillar = () => {
    onChange({
      ...data,
      pillars: [...data.pillars, { title: '', detail: '' }],
    })
  }

  const removePillar = (index: number) => {
    onChange({
      ...data,
      pillars: data.pillars.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="admin-form">
      <label>
        Introduction
        <textarea
          value={data.intro}
          onChange={(e) => handleIntroChange(e.target.value)}
        />
      </label>

      <div className="admin-form-header">
        <h3>Pillars</h3>
        <button className="btn ghost sm" onClick={addPillar}>Add Pillar</button>
      </div>
      {data.pillars.map((pillar, index) => (
        <div key={index} className="admin-form-item">
          <div className="admin-form-item-header">
            <h4>Pillar #{index + 1}</h4>
            <button className="btn ghost sm danger" onClick={() => removePillar(index)}>Remove</button>
          </div>
          <label>
            Title
            <input
              type="text"
              value={pillar.title}
              onChange={(e) => handlePillarChange(index, 'title', e.target.value)}
            />
          </label>
          <label>
            Detail
            <textarea
              value={pillar.detail}
              onChange={(e) => handlePillarChange(index, 'detail', e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  )
}

export default NarrativeForm
