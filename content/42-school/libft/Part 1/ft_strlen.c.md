## Task

Create a function that returns the number of characters int the array of chars, a.k.a string.

E.g: "hello" must return ```5```.

## Info

Manual: 

```shell
STRLEN(3)                                                                    Library Functions Manual                                                                   STRLEN(3)

NAME
     strlen – find length of string

LIBRARY
     Standard C Library (libc, -lc)

SYNOPSIS
     #include <string.h>

     size_t
     strlen(const char *s);

DESCRIPTION
     The strlen() function computes the length of the string s.

RETURN VALUES
     The strlen() function returns the number of characters that precede the terminating NUL character.  

SEE ALSO
     string(3), wcslen(3), wcswidth(3)

STANDARDS
     The strlen() function conforms to ISO/IEC 9899:1990 (“ISO C90”).
```

# Action

The solution was pretty straightforward. We just need to count the characters using a loop, until the null byte, a.k.a ```\0```.

I also learned about the ```size_t``` and ```const```:

1. size_t: 

```c
#include "libft.h"

size_t	ft_strlen(const char *s)
{
	int	i;

	i = 0;
	while (s[i])
		i++;

	return (i);
}
```

#C #development #libft #school_42 #size_t #const