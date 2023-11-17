import { Requirement } from "./requirement";
import { Link } from "./link";

export interface RequirementsGraph {
    nodes: Array<Requirement>;
    links: Array<Link>;
}
