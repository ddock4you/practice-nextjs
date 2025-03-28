'use server';

import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from '@/utils/supabase/server';

export async function getAllUsers() {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    throw [];
  }

  return data.users;
}

export async function getUserById(userId) {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error) {
    throw null;
  }
  return data.user;
}

export async function getAllMessages({ chatUserId }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error('User not authenticated');
  }

  const { data, error: getMessageError } = await supabase
    .from('message')
    .select('*')
    .or(`receiver.eq.${chatUserId}, receiver.eq.${session!.user.id}`)
    .or(`sender.eq.${chatUserId}, sender.eq.${session!.user.id}`)
    .order('created_at', { ascending: true });

  if (getMessageError) {
    console.log({ getMessageError });
    throw getMessageError.message;
  }

  return data;
}
