<?php

namespace App\Form;

use App\Entity\Issue;
use phpDocumentor\Reflection\Types\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class KnownIssueType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'attr' =>['placeholder' => 'Issue titel','class' => 'issue-title-input text-input text-input--hover']
            ])
            ->add('content', TextType::class, [
                'required' => false,
                'attr' =>['class' => 'text-input']
            ])
            ->add('keywords', TextType::class, [
                'required' => false,
                'attr' =>['class' => 'text-input keyword-input']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Issue::class,
        ]);
    }
}
