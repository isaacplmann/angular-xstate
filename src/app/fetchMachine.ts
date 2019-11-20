import { Machine, assign } from 'xstate';

export const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      results: undefined as any[] | undefined,
      message: undefined as string | undefined
    },
    states: {
      idle: {
        on: {
          FETCH: { target: 'loading' }
        }
      },
      loading: {
        entry: ['fetchData'],
        on: {
          RESOLVE: {
            target: 'success',
            actions: 'setResults'
          },
          REJECT: {
            target: 'failure',
            actions: 'setMessage'
          }
        }
      },
      success: {
        on: {
          FETCH: {
            target: 'loading'
          }
        }
      },
      failure: {
        on: {
          FETCH: {
            target: 'loading'
          }
        }
      }
    }
  },
  {
    actions: {
      setResults: assign({
        results: (context, event: any) => event.results
      }),
      setMessage: assign({
        message: (context, event: any) => event.message
      })
    }
  }
);
