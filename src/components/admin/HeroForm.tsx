import type { HeroContent } from '../../data/content'

type HeroFormProps = {
  data: HeroContent
  onChange: (data: HeroContent) => void
}

const HeroForm = ({ data, onChange }: HeroFormProps) => {
  const handleChange = (field: keyof HeroContent, value: string | object) => {
    onChange({ ...data, [field]: value })
  }

  const handleCtaChange = (cta: 'primaryCta' | 'secondaryCta', field: 'label' | 'href', value: string) => {
    onChange({
      ...data,
      [cta]: { ...data[cta], [field]: value },
    })
  }

  return (
    <div className="admin-form">
      <label>
        Name
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>
      <label>
        Title
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </label>
      <label>
        Summary
        <textarea
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </label>
      <label>
        Availability
        <input
          type="text"
          value={data.availability}
          onChange={(e) => handleChange('availability', e.target.value)}
        />
      </label>

      <div className="admin-form-group">
        <h3>Primary CTA</h3>
        <label>
          Label
          <input
            type="text"
            value={data.primaryCta.label}
            onChange={(e) => handleCtaChange('primaryCta', 'label', e.target.value)}
          />
        </label>
        <label>
          Href
          <input
            type="text"
            value={data.primaryCta.href}
            onChange={(e) => handleCtaChange('primaryCta', 'href', e.target.value)}
          />
        </label>
      </div>

      <div className="admin-form-group">
        <h3>Secondary CTA</h3>
        <label>
          Label
          <input
            type="text"
            value={data.secondaryCta.label}
            onChange={(e) => handleCtaChange('secondaryCta', 'label', e.target.value)}
          />
        </label>
        <label>
          Href
          <input
            type="text"
            value={data.secondaryCta.href}
            onChange={(e) => handleCtaChange('secondaryCta', 'href', e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

export default HeroForm
