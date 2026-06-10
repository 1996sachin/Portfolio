import type { TimelineItem } from '../../data/content'

type TimelineFormProps = {
  data: TimelineItem[]
  onChange: (data: TimelineItem[]) => void
  title: string
}

const TimelineForm = ({ data, onChange, title }: TimelineFormProps) => {
  const handleItemChange = (index: number, field: keyof TimelineItem, value: string | string[]) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addItem = () => {
    onChange([
      {
        period: '',
        title: '',
        place: '',
        description: '',
        highlights: [],
      },
      ...data,
    ])
  }

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleHighlightChange = (itemIndex: number, hIndex: number, value: string) => {
    const newData = [...data]
    const newHighlights = [...newData[itemIndex].highlights]
    newHighlights[hIndex] = value
    newData[itemIndex] = { ...newData[itemIndex], highlights: newHighlights }
    onChange(newData)
  }

  const addHighlight = (itemIndex: number) => {
    const newData = [...data]
    newData[itemIndex] = {
      ...newData[itemIndex],
      highlights: [...newData[itemIndex].highlights, ''],
    }
    onChange(newData)
  }

  const removeHighlight = (itemIndex: number, hIndex: number) => {
    const newData = [...data]
    newData[itemIndex] = {
      ...newData[itemIndex],
      highlights: newData[itemIndex].highlights.filter((_, i) => i !== hIndex),
    }
    onChange(newData)
  }

  return (
    <div className="admin-form">
      <div className="admin-form-header">
        <h3>{title}</h3>
        <button className="btn ghost sm" onClick={addItem}>Add Item</button>
      </div>
      {data.map((item, index) => (
        <div key={index} className="admin-form-item">
          <div className="admin-form-item-header">
            <h4>Item #{index + 1}</h4>
            <button className="btn ghost sm danger" onClick={() => removeItem(index)}>Remove</button>
          </div>
          <div className="admin-grid">
            <label>
              Period
              <input
                type="text"
                value={item.period}
                onChange={(e) => handleItemChange(index, 'period', e.target.value)}
              />
            </label>
            <label>
              Title
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleItemChange(index, 'title', e.target.value)}
              />
            </label>
          </div>
          <label>
            Place
            <input
              type="text"
              value={item.place}
              onChange={(e) => handleItemChange(index, 'place', e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
            />
          </label>
          <div className="admin-form-group">
            <h5>Highlights</h5>
            {item.highlights.map((h, hIndex) => (
              <div key={hIndex} className="admin-input-group">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => handleHighlightChange(index, hIndex, e.target.value)}
                />
                <button className="btn ghost sm" onClick={() => removeHighlight(index, hIndex)}>×</button>
              </div>
            ))}
            <button className="btn ghost sm" onClick={() => addHighlight(index)}>Add Highlight</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelineForm
