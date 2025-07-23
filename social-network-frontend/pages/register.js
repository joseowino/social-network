import { useState } from 'react';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    nickname: '',
    aboutMe: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dob: '',
          nickname: '',
          aboutMe: '',
          avatar: null,
        });
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
      <h2>Register</h2>

      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
      <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
      <input type="date" name="dob" required onChange={handleChange} />

      <input type="text" name="nickname" placeholder="Nickname (optional)" onChange={handleChange} />
      <textarea name="aboutMe" placeholder="About Me (optional)" onChange={handleChange} />
      <input type="file" name="avatar" accept="image/*" onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
}
