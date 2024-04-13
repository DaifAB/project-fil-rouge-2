export function capitalize(word: string) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function fillString(str?: string, ...params: (string | any)[]) {
  if (!str) {
    return '';
  }

  return str.replace(/{(\d+)}/g, (match, index) => {
    return params[index] || '';
  });
}

// function that format a date to format 15.09.2023
export function formatDate(date: any) {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;
}

export function formatTime(date: Date) {
  if (!date) {
    return '';
  }

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export const hasNonUndefinedValue = (obj: any) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      return true;
    }
  }
  return false;
};

export const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
