import { useState, type FormEvent } from 'react';
import * as Soup from '../../index';

function AuthenticationContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { notify } = Soup.useToast();
  const submit = (event: FormEvent) => { event.preventDefault(); notify({ title: 'Demo sign in submitted', description: email, tone: 'success' }); };
  return <main className="soup-auth"><Soup.Card><Soup.Stack gap="lg">
    <header><h1>Welcome back.</h1><p className="soup-example-lead">Sign in to continue to your workspace.</p></header>
    <form onSubmit={submit}><Soup.Stack>
      <Soup.Field label="Email address" htmlFor="auth-email"><Soup.Input id="auth-email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required /></Soup.Field>
      <Soup.Field label="Password" htmlFor="auth-password"><Soup.Input id="auth-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></Soup.Field>
      <Soup.Button type="submit">Sign in</Soup.Button>
    </Soup.Stack></form>
    <Soup.Separator /><p>New here? <Soup.Link href="#create-account">Create an account</Soup.Link></p>
  </Soup.Stack></Soup.Card></main>;
}

export function AuthenticationExample() { return <Soup.ToastProvider><AuthenticationContent /></Soup.ToastProvider>; }
