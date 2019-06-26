import { ShipModel } from './components/ShipModel/ShipModel';
import { Covers } from './components/Covers/Covers';

document.querySelectorAll('.ArcticSunriseBlock').forEach(
	barquitoBlockContainer => wp.element.render(<ShipModel />, barquitoBlockContainer )
);

