import React from 'react';
import './ClientPrograms.css'; // Import the CSS file for styling

const ClientPrograms = () => {
  const skills = [
    {
      src: '/mobile.mp4',
      type: 'video',
      alt: 'Mobile Applications',
      name: 'Mobile Applications',
      description: [
        'Learn to build cutting-edge mobile apps.',
        'Master platforms like iOS and Android.',
      ],
    },
    {
      src: '/newfrontend.mp4',
      type: 'video',
      alt: 'Frontend Developer',
      name: 'Frontend Developer',
      description: [
        'Create stunning user interfaces.',
        'Master HTML, CSS, and JavaScript frameworks.',
      ],
    },
    {
      src: '/backend.mp4',
      type: 'video',
      alt: 'Backend Developer',
      name: 'Backend Developer',
      description: [
        'Develop robust server-side applications.',
        'Work with databases and APIs effectively.',
      ],
    },
    {
      src: '/newdevops.mp4',
      type: 'video',
      alt: 'DevOps',
      name: 'DevOps',
      description: [
        'Streamline development and deployment processes.',
        'Implement CI/CD pipelines and automation.',
      ],
    },
    {
      src: '/data.mp4',
      type: 'video',
      alt: 'Analytics & Data Science',
      name: 'Analytics & Data Science',
      description: [
        'Analyze and interpret complex datasets.',
        'Use tools like Python, R, and machine learning.',
      ],
    },
    {
      src: '/tech.mp4',
      type: 'video',
      alt: 'Emerging Technologies',
      name: 'Emerging Technologies',
      description: [
        'Stay ahead with the latest tech trends.',
        'Explore AI, blockchain, and IoT solutions.',
      ],
    },
    {
      src: '/newcloud.mp4',
      type: 'video',
      alt: 'Cloud Computing',
      name: 'Cloud Computing',
      description: [
        'Master cloud platforms like AWS and Azure.',
        'Learn to deploy scalable applications.',
      ],
    },
    {
      src: '/newuiux.mp4',
      type: 'video',
      alt: 'UI/UX Designer',
      name: 'UI/UX Designer',
      description: [
        'Design intuitive and engaging user experiences.',
        'Learn tools like Figma and Adobe XD.',
      ],
    },
    {
      src: '/cyber.mp4',
      type: 'video',
      alt: 'Cyber Security',
      name: 'Cyber Security',
      description: [
        'Protect systems from cyber threats.',
        'Learn ethical hacking and network security.',
      ],
    },
  ];

  return (
    <div className="skill-container">
      {skills.map((skill, index) => (
        <div className="skill-item" key={index}>
          <span className="skill-icon">
            {skill.type === 'video' ? (
              <video src={skill.src} alt={skill.alt} autoPlay loop muted />
            ) : (
              <img src={skill.src} alt={skill.alt} />
            )}
          </span>
          <span className="skill-name">{skill.name}</span>
          <span className="skill-description">
            {skill.description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ClientPrograms;
