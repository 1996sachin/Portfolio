import type { AboutHighlight } from '../../data/content'

type HighlightsFormProps = {
  data: AboutHighlight[]
  onChange: (data: AboutHighlight[]) => void
}

const HighlightsForm = ({ data, onChange }: HighlightsFormProps) => {
  const handleChange = (index: number, field: keyof AboutHighlight, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addItem = () => {
    onChange([...data, { label: '', value: '' }])
  }

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className="admin-form">
      <div className="admin-form-header">
        <h3>About Highlights</h3>
        <button className="btn ghost sm" onClick={addItem}>Add Highlight</button>
      </div>
      {data.map((item, index) => (
        <div key={index} className="admin-form-item admin-grid">
          <label>
            Label
            <input
              type="text"
              value={item.label}
              onChange={(e) => handleChange(index, 'label', e.target.value)}
            />
          </label>
          <label>
            Value
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
            />
          </label>
          <button className="btn ghost sm danger self-end" onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default HighlightsForm
