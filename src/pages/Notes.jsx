import { Box, Button, Input, Select, VStack, HStack, Text, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { client } from '../../lib/crud';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, []);

  const fetchNotes = async () => {
    const fetchedNotes = await client.getWithPrefix('note:');
    setNotes(fetchedNotes || []);
  };

  const fetchTags = async () => {
    const fetchedTags = await client.getWithPrefix('tag:');
    setTags(fetchedTags || []);
  };

  const handleNoteSubmit = async () => {
    if (newNote && selectedTag) {
      await client.set(`note:${Date.now()}`, { text: newNote, tag: selectedTag });
      setNewNote('');
      fetchNotes();
      toast({
        title: 'Note added.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleTagSubmit = async () => {
    if (newTag) {
      await client.set(`tag:${newTag}`, { name: newTag });
      setNewTag('');
      fetchTags();
      toast({
        title: 'Tag created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Select placeholder="Filter by tag" onChange={(e) => setSelectedTag(e.target.value)}>
          {tags.map(tag => (
            <option key={tag.key} value={tag.value.name}>{tag.value.name}</option>
          ))}
        </Select>
      </Box>
      <Box>
        {notes.filter(note => note.value.tag === selectedTag || selectedTag === '').map(note => (
          <HStack key={note.key}>
            <Text>{note.value.text}</Text>
            <Text fontSize="sm" color="gray.500">{note.value.tag}</Text>
          </HStack>
        ))}
      </Box>
      <Box>
        <HStack>
          <Input placeholder="New note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          <Select placeholder="Select tag" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
            {tags.map(tag => (
              <option key={tag.key} value={tag.value.name}>{tag.value.name}</option>
            ))}
          </Select>
          <Button onClick={handleNoteSubmit}>Add Note</Button>
        </HStack>
      </Box>
      <Box>
        <Input placeholder="New tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
        <Button onClick={handleTagSubmit}>Create Tag</Button>
      </Box>
    </VStack>
  );
};

export default Notes;