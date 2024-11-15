import { NumberInputProps, useFormValue } from 'sanity';
import {Stack, Text} from '@sanity/ui'

function subtractMinutesFromDate(date: string, minutes: number) {
  return new Date(new Date(date).getTime() - minutes * 60000)
} //helper to subtract minutes from the date when entered in input field

export function DoorsOpenInput(props: NumberInputProps) {
  const date = useFormValue(['date']) as string | undefined
  
  return (
    
<Stack space={3}>
      {props.renderDefault(props)}
      {typeof props.value === 'number' && date ? (
        <Text size={1}>
          Doors open{' '}
          {subtractMinutesFromDate(date, props.value).toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
      ) : null}
    </Stack>
  )
}

