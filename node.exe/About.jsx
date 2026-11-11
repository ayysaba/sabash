/* About სექცია — გაუმჯობესებული hero layout */
import React from 'react';
import SectionCard from '../ui/SectionCard';
import { ownerInfo } from '../../data/portfolioData';

export default function About() {
  return (
    <SectionCard id="about">
      <div className="about-hero">
        <div className="about-avatar-wrap">
          <img
            className="about-avatar"
            src={ownerInfo.photo}
            alt={ownerInfo.photoAlt}
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://i.scdn.co/image/ab67616d0000b27365bc1bfbb95ff5264f788839';
            }}
          />
          <span className="about-avatar-ring" />
        </div>

        <div className="about-hero-text">
          <h2 className="about-name">ჩემ შესახებ</h2>
          <p className="about-tagline">
            👋 გამარჯობა! მე ვარ <strong>საბა მჭედლიშვილი</strong>, 16 წლის.
            ახლახან დავიწყე პროგრამირების შესწავლა და ძალიან მაინტერესებს
            ვებ-ტექნოლოგიები.
          </p>
          <p className="about-tagline">
            ამ ეტაპზე აქტიურად ვსწავლობ <span className="tech-pill">HTML5</span>,{' '}
            <span className="tech-pill">CSS3</span> და{' '}
            <span className="tech-pill">JavaScript</span>-ის საფუძვლებს.
          </p>
          <p className="about-tagline">
            ჩემი მიზანია შევქმნა სუფთა, სემანტიკური და მომხმარებლისთვის
            მოსახერხებელი ვებ-გვერდები.
          </p>

          <blockquote className="about-quote">
            <em>{ownerInfo.quote}</em>
          </blockquote>
        </div>
      </div>
    </SectionCard>
  );
}
