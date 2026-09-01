// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { PasswordGenerator } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Password/PasswordGenerator',
  component: PasswordGenerator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultLength: {
      control: { type: 'range', min: 8, max: 32, step: 1 },
      description: 'Default password length',
    },
    minLength: {
      control: { type: 'range', min: 4, max: 32, step: 1 },
      description: 'Minimum password length',
    },
    maxLength: {
      control: { type: 'range', min: 8, max: 128, step: 1 },
      description: 'Maximum password length',
    },
    includeUppercase: {
      control: 'boolean',
      description: 'Include uppercase letters',
    },
    includeLowercase: {
      control: 'boolean',
      description: 'Include lowercase letters',
    },
    includeNumbers: {
      control: 'boolean',
      description: 'Include numbers',
    },
    includeSpecialChars: {
      control: 'boolean',
      description: 'Include special characters',
    },
    showStrength: {
      control: 'boolean',
      description: 'Show strength meter',
    },
    showOptions: {
      control: 'boolean',
      description: 'Show generation options',
    },
    onGenerate: {
      description: 'Callback when password is generated',
    },
    onCopy: {
      description: 'Callback when password is copied',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordGenerator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic password generator
 */
export const Basic: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * With strong requirements (uppercase, lowercase, numbers, special chars)
 */
export const StrongRequirements: Story = {
  args: {
    defaultLength: 20,
    minLength: 16,
    maxLength: 64,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Alphanumeric only (no special characters)
 */
export const AlphanumericOnly: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Lowercase and numbers only
 */
export const LowercaseNumbersOnly: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: false,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Very short passwords
 */
export const ShortPasswords: Story = {
  args: {
    defaultLength: 8,
    minLength: 4,
    maxLength: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Very long passwords
 */
export const LongPasswords: Story = {
  args: {
    defaultLength: 32,
    minLength: 24,
    maxLength: 128,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Without strength meter
 */
export const WithoutStrength: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: false,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Without options
 */
export const WithoutOptions: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: false,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Minimal display
 */
export const Minimal: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: false,
    showOptions: false,
    onGenerate: fn(),
    onCopy: fn(),
  },
};

/**
 * Full-featured with callbacks
 */
export const FullFeatured: Story = {
  args: {
    defaultLength: 20,
    minLength: 8,
    maxLength: 64,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
  },
  render: (args) => {
    const [lastGenerated, setLastGenerated] = useState('');
    const [lastCopied, setLastCopied] = useState(false);

    return (
      <div style={{ width: '450px' }}>
        <PasswordGenerator
          {...args}
          onGenerate={(pwd) => {
            setLastGenerated(pwd);
            args.onGenerate(pwd);
          }}
          onCopy={(pwd) => {
            setLastCopied(true);
            setTimeout(() => setLastCopied(false), 2000);
            args.onCopy(pwd);
          }}
        />
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
          {lastGenerated && (
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>Last Generated:</strong> <code>{lastGenerated}</code>
            </p>
          )}
          {lastCopied && (
            <p style={{ margin: 0, color: '#22c55e', fontWeight: 'bold' }}>✓ Copied to clipboard!</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Interactive password length
 */
export const InteractiveLength: Story = {
  render: () => {
    const [length, setLength] = useState(16);

    return (
      <div style={{ width: '450px' }}>
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Password Length: <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{length}</span> characters
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <PasswordGenerator
          defaultLength={length}
          minLength={8}
          maxLength={32}
          includeUppercase={true}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={true}
          showStrength={true}
          showOptions={true}
        />
      </div>
    );
  },
};

/**
 * Character set configuration
 */
export const CharacterSetConfig: Story = {
  render: () => {
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [special, setSpecial] = useState(true);

    return (
      <div style={{ width: '450px' }}>
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
          <p style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Character Set Options:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              Uppercase (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              Lowercase (a-z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              Numbers (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={special}
                onChange={(e) => setSpecial(e.target.checked)}
              />
              Special Characters (!@#$...)
            </label>
          </div>
        </div>

        <PasswordGenerator
          defaultLength={16}
          minLength={8}
          maxLength={32}
          includeUppercase={uppercase}
          includeLowercase={lowercase}
          includeNumbers={numbers}
          includeSpecialChars={special}
          showStrength={true}
          showOptions={true}
        />
      </div>
    );
  },
};

/**
 * Multi-password generation
 */
export const MultiPasswordGeneration: Story = {
  render: () => {
    const [passwords, setPasswords] = useState<string[]>([]);

    return (
      <div style={{ width: '450px' }}>
        <PasswordGenerator
          defaultLength={16}
          minLength={8}
          maxLength={32}
          includeUppercase={true}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={true}
          showStrength={true}
          showOptions={true}
          onGenerate={(pwd) => {
            setPasswords((prev) => [pwd, ...prev.slice(0, 4)]);
          }}
        />

        {passwords.length > 0 && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem' }}>
            <p style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
              Recent Passwords ({passwords.length}):
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {passwords.map((pwd, idx) => (
                <code
                  key={idx}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    wordBreak: 'break-all',
                  }}
                >
                  {pwd}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Use case: Account creation form
 */
export const AccountCreationForm: Story = {
  render: () => {
    const [useGenerated, setUseGenerated] = useState(false);
    const [customPassword, setCustomPassword] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    return (
      <div style={{ width: '450px', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Create Your Account</h3>

        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.375rem', border: '1px solid #e0f2fe' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={!useGenerated}
              onChange={() => setUseGenerated(false)}
            />
            Use My Own Password
          </label>
        </div>

        {!useGenerated && (
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="text"
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem', border: '1px solid #dcfce7' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={useGenerated}
              onChange={() => setUseGenerated(true)}
            />
            Generate Strong Password
          </label>
        </div>

        {useGenerated && (
          <div style={{ marginBottom: '1.5rem' }}>
            <PasswordGenerator
              defaultLength={16}
              minLength={8}
              maxLength={32}
              includeUppercase={true}
              includeLowercase={true}
              includeNumbers={true}
              includeSpecialChars={true}
              showStrength={true}
              showOptions={true}
              onGenerate={setGeneratedPassword}
            />
          </div>
        )}

        <button
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: useGenerated && generatedPassword ? '#3b82f6' : (customPassword ? '#3b82f6' : '#d1d5db'),
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: (useGenerated && generatedPassword) || customPassword ? 'pointer' : 'not-allowed',
          }}
          disabled={useGenerated ? !generatedPassword : !customPassword}
        >
          Continue
        </button>
      </div>
    );
  },
};

/**
 * Comparison of different configurations
 */
export const ConfigurationComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Standard (16 chars)</h4>
        <PasswordGenerator
          defaultLength={16}
          minLength={8}
          maxLength={32}
          includeUppercase={true}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={true}
          showStrength={true}
          showOptions={false}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Enterprise (32 chars)</h4>
        <PasswordGenerator
          defaultLength={32}
          minLength={24}
          maxLength={128}
          includeUppercase={true}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={true}
          showStrength={true}
          showOptions={false}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Alphanumeric Only</h4>
        <PasswordGenerator
          defaultLength={16}
          minLength={8}
          maxLength={32}
          includeUppercase={true}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={false}
          showStrength={true}
          showOptions={false}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Simple (8 chars)</h4>
        <PasswordGenerator
          defaultLength={8}
          minLength={4}
          maxLength={16}
          includeUppercase={false}
          includeLowercase={true}
          includeNumbers={true}
          includeSpecialChars={false}
          showStrength={true}
          showOptions={false}
        />
      </div>
    </div>
  ),
};

/**
 * Custom class styling
 */
export const CustomClass: Story = {
  args: {
    defaultLength: 16,
    minLength: 8,
    maxLength: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    showStrength: true,
    showOptions: true,
    onGenerate: fn(),
    onCopy: fn(),
    className: 'custom-password-generator',
  },
  render: (args) => (
    <div style={{ width: '450px' }}>
      <PasswordGenerator {...args} />
      <style>{`
        .custom-password-generator {
          padding: 1rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
          border-radius: 0.75rem;
          border: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  ),
};
