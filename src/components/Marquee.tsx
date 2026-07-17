import { credentialLine } from '@/lib/constants';

export default function Marquee() {
  return <section className="marquee" aria-label="Clients and capabilities"><div className="marquee__track"><span>{credentialLine}</span><span aria-hidden="true">{credentialLine}</span></div></section>;
}
