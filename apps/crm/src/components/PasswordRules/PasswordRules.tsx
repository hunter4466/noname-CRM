import { classNames } from '@noname/ui';
import { IconCheck } from '@noname/ui/icons';
import styles from './PasswordRules.module.css';

export interface PasswordRule {
  label: string;
  isMet: boolean;
}

export interface PasswordRulesProps {
  rules: PasswordRule[];
}

export const PasswordRules = ({ rules }: PasswordRulesProps) => (
  <div className={styles.rules}>
    {rules.map((rule) => (
      <span key={rule.label} className={classNames(styles.rule, rule.isMet && styles.met)}>
        <IconCheck size={16} />
        {rule.label}
      </span>
    ))}
  </div>
);
