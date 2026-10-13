import type { ModifierGroup, ProductModifierGroupLink } from '@noname/types';
import { ButtonSize, Card, CardBody, CardHeader, Select } from '@noname/ui';
import { Route } from '@/types/Route';
import { AttachedGroupRow } from '../AttachedGroupRow/AttachedGroupRow';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import styles from './ProductModifierGroupsSection.module.css';

const ATTACH_PLACEHOLDER = '';

export interface ProductModifierGroupsSectionProps {
  links: ProductModifierGroupLink[];
  allGroups: ModifierGroup[];
  onAttach: (groupId: string) => void;
  onDetach: (groupId: string) => void;
  onMove: (groupId: string, direction: -1 | 1) => void;
}

export const ProductModifierGroupsSection = ({ links, allGroups, onAttach, onDetach, onMove }: ProductModifierGroupsSectionProps) => {
  const attachable = allGroups.filter((group) => !group.isNested && !links.some((link) => link.groupId === group.id));
  return (
    <Card>
      <CardHeader
        title="Modifier groups"
        subtitle="Shared groups — edit once, every product using them updates. Use the arrows to set the order the cashier sees."
        actions={
          <>
            <Select
              className={styles.attach}
              aria-label="Attach group"
              value={ATTACH_PLACEHOLDER}
              options={[
                { value: ATTACH_PLACEHOLDER, label: 'Attach group…' },
                ...attachable.map((group) => ({ value: group.id, label: group.name })),
              ]}
              onChange={(event) => onAttach(event.target.value)}
            />
            <ButtonLink href={Route.ModifierGroups} size={ButtonSize.Small}>
              New group
            </ButtonLink>
          </>
        }
      />
      <CardBody>
        {links.length === 0 && <div className="hint">No modifier groups yet — this product is added to the order with one tap.</div>}
        {links.map((link, index) => {
          const group = allGroups.find((candidate) => candidate.id === link.groupId);
          return group ? (
            <AttachedGroupRow
              key={link.groupId}
              group={group}
              maxOverride={link.maxOverride}
              isFirst={index === 0}
              isLast={index === links.length - 1}
              onDetach={() => onDetach(link.groupId)}
              onMove={(direction) => onMove(link.groupId, direction)}
            />
          ) : null;
        })}
      </CardBody>
    </Card>
  );
};
