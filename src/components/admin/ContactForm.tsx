import type { ContactDetails } from '../../data/content'

type ContactFormProps = {
  data: ContactDetails
  onChange: (data: ContactDetails) => void
}

const ContactForm = ({ data, onChange }: ContactFormProps) => {
  const handleChange = (field: keyof ContactDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleSocialChange = (index: number, field: 'label' | 'href', value: string) => {
    const newSocials = [...data.socials]
    newSocials[index] = { ...newSocials[index], [field]: value }
    onChange({ ...data, socials: newSocials })
  }

  const addSocial = () => {
    onChange({
      ...data,
      socials: [...data.socials, { label: '', href: '' }],
    })
  }

  const removeSocial = (index: number) => {
    onChange({
      ...data,
      socials: data.socials.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="admin-form">
      <label>
        Email
        <input
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </label>
      <label>
        Phone
        <input
          type="text"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </label>
      <label>
        Location
        <input
          type="text"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </label>
      <label>
        Availability Note
        <textarea
          value={data.availabilityNote}
          onChange={(e) => handleChange('availabilityNote', e.target.value)}
        />
      </label>

      <div className="admin-form-header">
        <h3>Social Links</h3>
        <button className="btn ghost sm" onClick={addSocial}>Add Social</button>
      </div>
      {data.socials.map((social, index) => (
        <div key={index} className="admin-form-item admin-grid">
          <label>
            Label
            <input
              type="text"
              value={social.label}
              onChange={(e) => handleSocialChange(index, 'label', e.target.value)}
            />
          </label>
          <label>
            Href
            <input
              type="text"
              value={social.href}
              onChange={(e) => handleSocialChange(index, 'href', e.target.value)}
            />
          </label>
          <button className="btn ghost sm danger self-end" onClick={() => removeSocial(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default ContactForm
