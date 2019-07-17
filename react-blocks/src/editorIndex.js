import { StaticBlock } from './blocks/Static/StaticBlock';
import { StaticWithAPIBlock } from './blocks/StaticWithAPI/StaticWithAPIBlock';
import { ArcticSunriseBlock } from './blocks/ArcticSunrise/ArcticSunriseBlock';
import { CoversBlock } from './blocks/Covers/CoversBlock';

import { convertBlocks } from './convertBlocks';

const staticBlock = new StaticBlock();
const staticWithAPIBlock = new StaticWithAPIBlock();
const arcticSunriseBlock = new ArcticSunriseBlock();
const coversBlock = new CoversBlock();

convertBlocks();
