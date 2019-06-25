import { ShipModel } from './components/ShipModel/ShipModel';

document.querySelectorAll('.ArcticSunriseBlock').forEach(
	barquitoBlockContainer => wp.element.render(<ShipModel />, barquitoBlockContainer )
);
