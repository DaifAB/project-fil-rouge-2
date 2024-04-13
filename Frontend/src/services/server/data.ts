'use server';

import { revalidatePath } from 'next/cache';

export const refreshData = (path: string) => {
  revalidatePath(path);
};
