import { Headings } from 'src/components/headings';
import { Quadrant, RingsLabel, RadarBlipSummary } from 'src/radar';

export function TechnologyRadar({ blips }: { blips: RadarBlipSummary[] }) {
	return (
		<>
			<Headings.h2>Technology Radar</Headings.h2>
			<p className="max-w-xl my-2">
				This is a summary of the most important technologies that, as a consulting company, are on our
				&quot;radar&quot;. Each technology is categorized into one of four quadrants (Techniques, Tools, Platforms, and
				Languages &amp; Frameworks) based on its usage for comparison. It is then filtered into one of the four rings
				(Adopt, Trial, Assess, and Hold) based on how we apply the technology for new projects.
			</p>

			<p className="max-w-xl my-2">
				<span className="font-bold">Adopt</span> indicates we prefer to adopt these technologies when applicable.
			</p>

			<p className="max-w-xl my-2">
				<span className="font-bold">Trial</span> indicates we intend to try them to see if they suit our purposes
				because they have been a good fit in the past.
			</p>

			<p className="max-w-xl my-2">
				<span className="font-bold">Assess</span> indicates we would like to do more research before applying a
				technology to a project.
			</p>

			<p className="max-w-xl my-2">
				<span className="font-bold">Hold</span> indicates we intend to hold off on applying the given technology and may
				consider sunsetting it in existing projects.
			</p>

			<div>
				<Quadrant showTitle blips={blips} quadrant="techniques" className="w-128 h-128 mr-4 inline-block" />
				<Quadrant showTitle blips={blips} quadrant="tools" className="w-128 h-128 inline-block" />
			</div>
			<div className="font-bold text-xs">
				<RingsLabel reverse className="align-top w-128 mr-4" />
				<RingsLabel className="align-top w-128" />
			</div>
			<div>
				<Quadrant showTitle blips={blips} quadrant="platforms" className="w-128 h-128 mr-4 inline-block" />
				<Quadrant showTitle blips={blips} quadrant="languages-and-frameworks" className="w-128 h-128 inline-block" />
			</div>
		</>
	);
}
