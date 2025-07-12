//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { useProfileFetch } from '@/hooks/useProfileFetch';
import {
  Pencil, CheckCircle2, X, Phone, Briefcase, Info,Link2, Save, Trash2, Plus, Mail,
} from 'lucide-react';
import { FaTelegramPlane, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';
import ExploreLoading from '@/app/loading';
import { useProfileUpdate } from '@/hooks/useProfileUpdate';
import AlertModal from '@/components/ui/modals/alertModal';
export default function CreatorVerificationPage() {
  const { data, isLoading, error } = useProfileFetch();
  const [editMode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
const [alertMessages, setAlertMessages] = useState<string[]>([]);

  const [form, setForm] = useState(null);
  const updateProfile = useProfileUpdate();
  useEffect(() => {
    if (data?.creatorProfile) setForm(data.creatorProfile);
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleExpChange = (i, v) => {
    const ex = [...form.experiencePoints]; ex[i] = v;
    setForm({ ...form, experiencePoints: ex });
  };
  const addExp = () => form.experiencePoints.length < 5 && setForm({ ...form, experiencePoints: [...form.experiencePoints, ''] });
  const removeExp = (i) => { const ex = [...form.experiencePoints]; ex.splice(i,1); setForm({ ...form, experiencePoints: ex }); };

  const handleApplyNow = () => {
    setForm({ phoneNumber:'', expertise:'', bio:'', experiencePoints:[], telegramLink:'', instagramLink:'', linkedinLink:'', portfolioLink:'', status:'' });
    setEditMode(true);
  };
const handleSave = async () => {
  if (!form) return;

  const requiredFields = ['phoneNumber', 'expertise', 'bio'];
  const missingFields = requiredFields.filter(field => !form[field]?.trim());

  if (missingFields.length > 0) {
    setAlertMessages(missingFields.map(field => `Please fill out the ${field} field.`));
    setShowAlert(true);
    return;
  }

  updateProfile.mutate(form, {
    onSuccess: () => {
      setEditMode(false);
      setShowAlert(false);
    },
    onError: (err) => {
      console.error(err);
      setAlertMessages(['Something went wrong while saving.']);
      setShowAlert(true);
    }
  });
};



  if (isLoading) return <ExploreLoading/>
  if (error || !data) return <div className="text-red-600">Error loading profile.</div>;

  const p = form;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Creator Verification</h1>
            <p className="text-gray-500">Manage your creator profile and verification status</p>
          </div>
          {form &&
            <button onClick={() => { if(editMode) setForm(data.creatorProfile); setEditMode(!editMode); }}
              className={`${editMode ? 'bg-red-500' : 'bg-blue-600'} text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow`}>
              {editMode ? <><X size={18}/> Cancel</> : <><Pencil size={18}/> Edit Profile</>}
            </button>
          }
        </header>

        {!form ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">You haven't applied yet.</h2>
            <p className="text-gray-600 mb-6">Start your creator journey by submitting your profile.</p>
            <button onClick={handleApplyNow}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow">Apply Now</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
              <img src={data.profilePic} alt="Profile"
                   className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto" />
              <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">{data.name}</h2>
              <p className="flex items-center justify-center text-gray-600 text-sm"><Mail size={16}/> {data.email}</p>
              <div className="mt-6 space-y-4">
                {renderField('Phone Number', Phone, 'phoneNumber', p.phoneNumber, editMode, handleChange)}
                {renderField('Expertise', Briefcase, 'expertise', p.expertise, editMode, handleChange)}
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-2 space-y-6">
              {section('About', <Info size={18}/>, renderField('Bio', Info, 'bio', p.bio, editMode, handleChange, true))}
              {section('Experience', <Briefcase size={18}/>,
                editMode ? (
                  <>
                    {p.experiencePoints.map((e,i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input value={e} onChange={e=>handleExpChange(i,e.target.value)}
                          placeholder="Describe experience" className="flex-1 border rounded-lg px-4 py-2"/>
                        <button type="button" onClick={()=>removeExp(i)}><Trash2 className="text-red-500"/></button>
                      </div>
                    ))}
                    {p.experiencePoints.length < 5 &&
                      <button type="button" onClick={addExp}
                        className="flex items-center gap-2 text-blue-600 font-medium"><Plus/> Add</button>
                    }
                  </>
                ) : (
                  <ul className="list-disc ml-6 space-y-2">
                    {p.experiencePoints.map((e,i)=><li key={i}>{e}</li>)}
                  </ul>
                )
              )}
              {section('Social Links', <Link2 size={18}/>,
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ['telegramLink','Telegram', <FaTelegramPlane className="text-blue-500"/>],
                    ['instagramLink','Instagram', <FaInstagram className="text-pink-500"/>],
                    ['linkedinLink','LinkedIn', <FaLinkedin className="text-blue-700"/>],
                    ['portfolioLink','Portfolio', <FaGlobe className="text-gray-700"/>],
                  ].map(([key,label,icon])=>(
                    <div key={key}>
                      {renderField(label, ()=>icon, key, p[key], editMode, handleChange)}
                    </div>
                  ))}
                </div>
              )}
              {section('Status', <Info size={18}/>,
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                  <div className="text-gray-700">{p.status || '—'}</div>
                </div>
              )}

              {editMode &&
                <div className="flex justify-end">
                  <button onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow">
                    <Save size={18}/> Save Changes
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      </div>
      {showAlert && (
  <AlertModal
    message={alertMessages}
    onClose={() => setShowAlert(false)}
  />
)}

    </div>
  );
}

function section(title, icon, content) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {content}
    </div>
  );
}

function renderField(label, IconComp, name, value, edit, onChange, textarea=false) {
  const Icon = typeof IconComp === 'function' ? IconComp : () => <IconComp />;
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
        <Icon/> {label}
      </label>
      {edit ? (
        textarea ? (
          <textarea name={name} value={value || ''} onChange={onChange}
            rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"/>
        ) : (
          <input name={name} value={value || ''} onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
        )
      ) : name.includes('Link') && value ? (
        <a href={value} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          <Icon/> {value}
        </a>
      ) : (
        <div className="text-gray-700">{value || '—'}</div>
      )}
    </div>
  );
}
