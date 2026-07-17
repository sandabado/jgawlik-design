'use client';

import Image from 'next/image';
import Dodecahedron from './Dodecahedron';

export default function Contact() {
  return <section className="contact-section" id="contact"><Dodecahedron className="contact-section__shape" /><div><figure className="contact-portrait"><Image src="/images/jesse-yucca-face.jpg" alt="Jesse Gawlik in Yucca Valley" width={512} height={512} sizes="112px" /></figure><p className="section-kicker">START A CONVERSATION</p><h2>LET&apos;S BUILD.</h2><p>Currently open to senior/principal product design roles, agentic AI product consulting, and select freelance engagements.</p><a className="contact-email" href="mailto:jesse.gawlik@gmail.com">jesse.gawlik@gmail.com</a><nav><a href="https://linkedin.com/in/jesse-gawlik" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/jesse-gawlik" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://wholebody.earth" target="_blank" rel="noreferrer">wholebody.earth ↗</a></nav></div></section>;
}
