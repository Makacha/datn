english_character = {'a': ['á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
                     'd': ['đ'],
                     'e': ['é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'],
                     'i': ['í', 'ì', 'ỉ', 'ĩ', 'ị'],
                     'o': ['ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ'],
                     'u': ['ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'],
                     'y': ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']
                     }
vietnamese_character = {k: x for x, y in english_character.items() for k in y}


def convert_vietnamese_to_english(text: str) -> str:
    for key, value in vietnamese_character.items():
        for char in value:
            text = text.replace(key, char)
    return text
