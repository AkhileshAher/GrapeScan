import FormField from "./FormField";

export default function ConsultantFields({ expertise, experience, onExpertiseChange, onExperienceChange }) {
  return (
    <div className="border border-dashed border-violet-200 rounded-xl p-4 mb-4 bg-violet-50/30">
      <h4 className="text-sm font-semibold text-violet-600 mb-3">👨‍💼 Consultant details</h4>
      <FormField
        id="registerExpertise"
        label="Area of expertise"
        value={expertise}
        onChange={onExpertiseChange}
        placeholder="e.g. Grape pathology, soil nutrition"
        required={false}
      />
      <div className="mb-0">
        <FormField
          id="registerExperience"
          label="Years of experience / certifications"
          value={experience}
          onChange={onExperienceChange}
          placeholder="e.g. 10 years, B.Sc Agriculture"
          required={false}
        />
      </div>
    </div>
  );
}