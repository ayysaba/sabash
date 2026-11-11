/* App.jsx — მთავარი კომპონენტი, სექციების სელექტორი */
import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';

import Header    from './components/layout/Header';
import Footer    from './components/layout/Footer';
import About     from './components/sections/About';
import Skills    from './components/sections/Skills';
import Projects  from './components/sections/Projects';
import Employees from './components/sections/Employees';
import Goals     from './components/sections/Goals';
import Contact   from './components/sections/Contact';

const ALL_SECTIONS = ['about', 'skills', 'projects', 'employees', 'goals', 'contact'];

export default function App() {
  const { theme, toggle } = useTheme();
  const [activeSection, setActiveSection] = useState('all');

  const handleNav = (id) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isVisible = (id) => activeSection === 'all' || activeSection === id;

  return (
    <>
      <Header
        theme={theme}
        onThemeToggle={toggle}
        activeSection={activeSection}
        onNavClick={handleNav}
      />

      <main>
        {isVisible('about')     && <About />}
        {isVisible('skills')    && <Skills />}
        {isVisible('projects')  && <Projects />}
        {isVisible('employees') && <Employees />}
        {isVisible('goals')     && <Goals />}
        {isVisible('contact')   && <Contact />}
      </main>

      <Footer />
    </>
  );
}
