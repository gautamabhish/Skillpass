//@ts-nocheck
'use client'
import React, { useState } from 'react';
import { Camera, Plus, X, User, Phone, Award, FileText, MessageCircle, Instagram, Linkedin, Globe, Upload } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashbaord';
import ExploreLoading from '@/app/loading';
import { useRef } from 'react';
import Image from 'next/image';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
const MAX_WORDS_EXPERTISE = 10;
const MAX_WORDS_BIO = 70;
const MAX_BULLETS_EXPERIENCE = 5;
const MAX_WORDS_PER_BULLET = 15;

const CreatorVerification = () => {
    const {data, loading } = useDashboard();
    if(loading){
        return(<ExploreLoading/>)
    }
    const imageRef = useRef<HTMLInputElement>(null);
    const imageUrl:string = data?.profilePic || '/user.jpg';
    const [profilePic , setProfilePic] = useState<File | null>(imageUrl);
    const [form, setForm] = useState({
        profilePicture: null,
        profilePicturePreview: '',
        phoneNumber: '',
        expertise: '',
        experiencePoints: [''],
        bio: '',
        telegramLink: '',
        instagramLink: '',
        linkedinLink: '',
        portfolioLink: '',
    });

    const [errors, setErrors] = useState({
        profilePicture: '',
        phoneNumber: '',
        expertise: '',
        experiencePoints: [''],
        bio: '',
        telegramLink: '',
        instagramLink: '',
        linkedinLink: '',
        portfolioLink: '',
    });

    const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));

        let currentErrors = { ...errors };
        const words = countWords(value);

        if (name === 'expertise') {
            currentErrors.expertise = words > MAX_WORDS_EXPERTISE ? `Maximum ${MAX_WORDS_EXPERTISE} words allowed.` : '';
        } else if (name === 'bio') {
            currentErrors.bio = words > MAX_WORDS_BIO ? `Maximum ${MAX_WORDS_BIO} words allowed.` : '';
        } else {
            currentErrors[name] = '';
        }

        if (name === 'phoneNumber' && value && !/^\+?[0-9\s-]{7,20}$/.test(value)) {
            currentErrors.phoneNumber = 'Please enter a valid phone number.';
        }

        setErrors(currentErrors);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prevErrors => ({ ...prevErrors, profilePicture: 'Only image files are allowed.' }));
                setForm(prevForm => ({ ...prevForm, profilePicture: null, profilePicturePreview: '' }));
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prevErrors => ({ ...prevErrors, profilePicture: 'Image size cannot exceed 2MB.' }));
                setForm(prevForm => ({ ...prevForm, profilePicture: null, profilePicturePreview: '' }));
                return;
            }
        setProfilePic(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prevForm => ({
                    ...prevForm,
                    profilePicture: file,
                    profilePicturePreview: reader.result,
                }));
                setErrors(prevErrors => ({ ...prevErrors, profilePicture: '' }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm(prevForm => ({ ...prevForm, profilePicture: null, profilePicturePreview: '' }));
            setErrors(prevErrors => ({ ...prevErrors, profilePicture: '' }));
        }
    };

    const handleExperienceChange = (index, value) => {
        const updatedExperiencePoints = form.experiencePoints.map((point, i) =>
            i === index ? value : point
        );
        setForm(prevForm => ({ ...prevForm, experiencePoints: updatedExperiencePoints }));

        let newErrors = [...errors.experiencePoints];
        if (countWords(value) > MAX_WORDS_PER_BULLET) {
            newErrors[index] = `Maximum ${MAX_WORDS_PER_BULLET} words per point.`;
        } else {
            newErrors[index] = '';
        }
        setErrors(prevErrors => ({ ...prevErrors, experiencePoints: newErrors }));
    };

    const addExperiencePoint = () => {
        if (form.experiencePoints.length < MAX_BULLETS_EXPERIENCE) {
            setForm(prevForm => ({
                ...prevForm,
                experiencePoints: [...prevForm.experiencePoints, ''],
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                experiencePoints: [...prevErrors.experiencePoints, ''],
            }));
        }
    };

    const removeExperiencePoint = (index) => {
        const updatedExperiencePoints = form.experiencePoints.filter((_, i) => i !== index);
        const updatedExperienceErrors = errors.experiencePoints.filter((_, i) => i !== index);
        setForm(prevForm => ({ ...prevForm, experiencePoints: updatedExperiencePoints }));
        setErrors(prevErrors => ({ ...prevErrors, experiencePoints: updatedExperienceErrors }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            profilePicture: !form.profilePicture ? 'Profile picture is required.' : errors.profilePicture,
            phoneNumber: !form.phoneNumber ? 'Phone number is required.' : errors.phoneNumber,
            expertise: !form.expertise ? 'Area of expertise is required.' : errors.expertise,
            experiencePoints: form.experiencePoints.map((point, index) => {
                if (!point.trim()) return 'Experience point cannot be empty.';
                if (countWords(point) > MAX_WORDS_PER_BULLET) return `Maximum ${MAX_WORDS_PER_BULLET} words per point.`;
                return '';
            }),
            bio: errors.bio,
            telegramLink: '',
            instagramLink: '',
            linkedinLink: '',
            portfolioLink: '',
        };

        if (form.experiencePoints.every(point => !point.trim())) {
            newErrors.experiencePoints = ['At least one experience point is required.'];
        }

        setErrors(newErrors);

        const hasErrors =
            Object.values(newErrors).some(error =>
                Array.isArray(error) ? error.some(item => item !== '') : error !== ''
            );

        if (!hasErrors) {
            const formDataToSend = new FormData();
            if (form.profilePicture) {
                formDataToSend.append('profilePicture', form.profilePicture);
            }
            formDataToSend.append('phoneNumber', form.phoneNumber);
            formDataToSend.append('expertise', form.expertise);
            formDataToSend.append('experiencePoints', JSON.stringify(form.experiencePoints));
            formDataToSend.append('bio', form.bio);
            formDataToSend.append('telegramLink', form.telegramLink);
            formDataToSend.append('instagramLink', form.instagramLink);
            formDataToSend.append('linkedinLink', form.linkedinLink);
            formDataToSend.append('portfolioLink', form.portfolioLink);

            console.log('Form Data to Send:', Object.fromEntries(formDataToSend.entries()));
            alert('Creator profile submitted successfully for verification!');
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-12">
               {/* <div className='pb-4 px-4'>
                 <NavbarLogged></NavbarLogged>
               </div> */}
            <div className="max-w-6xl mx-auto text-center">
                <header className="mb-8 text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Creator Profile Setup
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Help us understand your strengths and background to verify your profile and unlock exciting opportunities.
                    </p>
                </header>

                <main className="grid max-w-2xl grid-cols-1 mx-auto  gap-10">
                    {/* Left: Form Sections */}
                    <section className="lg:col-span-2 space-y-8">
                        {/* Basic Info Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <User className="w-6 h-6 text-blue-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                            </div>
                            
                            {/* Profile Picture Upload */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Profile Picture *
                                </label>
                                <div className="flex items-center space-x-6">
                                    <div className="relative hover:cursor-pointer" onClick={() => imageRef.current?.click()}>
                                        {form.profilePicturePreview ? (
                                            <Image height={100} width={100}
                                                src={form.profilePicturePreview}
                                                alt="Profile Preview"
                                                className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 "
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                                <Image width={100} height={100} src={imageUrl} alt='avatar' className='object-cover' ></Image>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            ref={imageRef}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden "
                                        />
                                    </div>
                                    <div>
                                      
                                        <p className="text-xs text-gray-500 mt-1">Max 2MB, JPG/PNG</p>
                                    </div>
                                </div>
                                {errors.profilePicture && (
                                    <p className="text-red-500 text-sm mt-2">{errors.profilePicture}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Expertise */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Area of Expertise * ({countWords(form.expertise)}/{MAX_WORDS_EXPERTISE} words)
                                </label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="expertise"
                                        value={form.expertise}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="e.g., Digital Marketing, Web Development, Content Creation"
                                    />
                                </div>
                                {errors.expertise && (
                                    <p className="text-red-500 text-sm mt-2">{errors.expertise}</p>
                                )}
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {form.experiencePoints.length}/{MAX_BULLETS_EXPERIENCE} points
                                </span>
                            </div>

                            {form.experiencePoints.map((point, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                                            <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                value={point}
                                                onChange={(e) => handleExperienceChange(index, e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                                rows="2"
                                                placeholder={`Experience point ${index + 1} (max ${MAX_WORDS_PER_BULLET} words)`}
                                            />
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-500">
                                                    {countWords(point)}/{MAX_WORDS_PER_BULLET} words
                                                </span>
                                                {form.experiencePoints.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExperiencePoint(index)}
                                                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            {errors.experiencePoints[index] && (
                                                <p className="text-red-500 text-sm mt-1">{errors.experiencePoints[index]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {form.experiencePoints.length < MAX_BULLETS_EXPERIENCE && (
                                <button
                                    type="button"
                                    onClick={addExperiencePoint}
                                    className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors w-full justify-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Experience Point
                                </button>
                            )}
                        </div>

                        {/* Bio & Links Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-800">Bio & Social Links</h2>
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio ({countWords(form.bio)}/{MAX_WORDS_BIO} words)
                                </label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    rows="4"
                                    placeholder="Tell us about yourself, your background, and what drives your passion..."
                                />
                                {errors.bio && (
                                    <p className="text-red-500 text-sm mt-2">{errors.bio}</p>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telegram
                                    </label>
                                    <div className="relative">
                                        <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="telegramLink"
                                            value={form.telegramLink}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="https://t.me/username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Instagram
                                    </label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="instagramLink"
                                            value={form.instagramLink}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="https://instagram.com/username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        LinkedIn
                                    </label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="linkedinLink"
                                            value={form.linkedinLink}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Portfolio/Website
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            name="portfolioLink"
                                            value={form.portfolioLink}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Submit for Verification
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CreatorVerification;